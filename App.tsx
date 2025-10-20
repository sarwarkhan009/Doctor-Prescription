import React, { useState, useRef, useCallback } from 'react';
import { Medicine } from './types';
import PrescriptionForm from './components/PrescriptionForm';

// Declare jspdf and html2canvas to inform TypeScript they are loaded globally from CDN
declare const jspdf: any;
declare const html2canvas: any;

const App: React.FC = () => {
  const [bp, setBp] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: crypto.randomUUID(), name: '', quantity: '', timing: 'Morning only', instruction: 'After Meal' },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const prescriptionRef = useRef<HTMLDivElement>(null);

  const handleVitalsChange = useCallback((field: 'bp' | 'weight', value: string) => {
    if (field === 'bp') setBp(value);
    else setWeight(value);
  }, []);

  const handleNotesChange = useCallback((value: string) => {
    setNotes(value);
  }, []);

  const handleMedicineChange = useCallback((index: number, field: keyof Omit<Medicine, 'id'>, value: string) => {
    setMedicines(prevMeds => {
      const newMeds = [...prevMeds];
      newMeds[index] = { ...newMeds[index], [field]: value };
      return newMeds;
    });
  }, []);

  const addMedicine = useCallback(() => {
    setMedicines(prevMeds => [
      ...prevMeds,
      { id: crypto.randomUUID(), name: '', quantity: '', timing: 'Morning only', instruction: 'After Meal' },
    ]);
  }, []);

  const removeMedicine = useCallback((id: string) => {
    setMedicines(prevMeds => prevMeds.filter(med => med.id !== id));
  }, []);

  const generatePdf = useCallback(() => {
    if (!prescriptionRef.current) return;
    setIsLoading(true);

    // Use a short timeout to allow React to re-render with isPdfMode=true
    setTimeout(() => {
        html2canvas(prescriptionRef.current!, { scale: 3, backgroundColor: '#ffffff' }).then((canvas: HTMLCanvasElement) => { // Increased scale for better quality
            const imgData = canvas.toDataURL('image/png', 1.0); // Use full quality PNG
            const { jsPDF } = jspdf;
            // A4 size: 210mm x 297mm.
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            const ratio = canvasWidth / canvasHeight;
            let widthInPdf = pdfWidth - 20; // with margin
            let heightInPdf = widthInPdf / ratio;
      
            if (heightInPdf > pdfHeight - 20) { // check if height is bigger than pdf height with margin
                heightInPdf = pdfHeight - 20;
                widthInPdf = heightInPdf * ratio;
            }
            
            const xOffset = (pdfWidth - widthInPdf) / 2;
            const yOffset = 10;
            
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, widthInPdf, heightInPdf);
            
            pdf.save('prescription.pdf');
            setIsLoading(false);
          }).catch((err: Error) => {
              console.error("Error generating PDF", err);
              setIsLoading(false);
          });
    }, 100);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800">Prescription Generator</h1>
            <p className="text-slate-600 mt-2">Create and download professional medical prescriptions with ease.</p>
        </header>
      
      <main>
        <PrescriptionForm
          ref={prescriptionRef}
          bp={bp}
          weight={weight}
          notes={notes}
          medicines={medicines}
          onVitalsChange={handleVitalsChange}
          onNotesChange={handleNotesChange}
          onMedicineChange={handleMedicineChange}
          onAddMedicine={addMedicine}
          onRemoveMedicine={removeMedicine}
          isPdfMode={isLoading}
        />
        
        <div className="text-center mt-8">
          <button
            onClick={generatePdf}
            disabled={isLoading}
            className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;