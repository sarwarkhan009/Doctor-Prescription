import React from 'react';
import { Medicine, Investigation } from '../types';
import MedicineInputRow from './MedicineInputRow';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface PrescriptionFormProps {
  patientName: string;
  date: string;
  age: string;
  gender: string;
  onPatientInfoChange: (field: 'patientName' | 'date' | 'age' | 'gender', value: string) => void;
  bp: string;
  weight: string;
  notes: string;
  medicines: Medicine[];
  investigations: Investigation[];
  onVitalsChange: (field: 'bp' | 'weight', value: string) => void;
  onNotesChange: (value: string) => void;
  onMedicineChange: (index: number, field: keyof Omit<Medicine, 'id'>, value: string) => void;
  onAddMedicine: () => void;
  onRemoveMedicine: (id: string) => void;
  onInvestigationChange: (index: number, value: string) => void;
  onAddInvestigation: () => void;
  onRemoveInvestigation: (id: string) => void;
  isPdfMode?: boolean;
}

const PrescriptionForm: React.ForwardRefRenderFunction<HTMLDivElement, PrescriptionFormProps> = (
  {
    patientName,
    date,
    age,
    gender,
    onPatientInfoChange,
    bp,
    weight,
    notes,
    medicines,
    investigations,
    onVitalsChange,
    onNotesChange,
    onMedicineChange,
    onAddMedicine,
    onRemoveMedicine,
    onInvestigationChange,
    onAddInvestigation,
    onRemoveInvestigation,
    isPdfMode = false,
  },
  ref
) => {
  const inputStyles = "w-full p-2 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-md border border-gray-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition";
  const patientInputBaseClasses = "w-full p-1 bg-transparent border-b border-dotted border-slate-400 focus:outline-none text-slate-800";

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div 
      className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto flex flex-col" 
      style={{ minHeight: '29.7cm' }} // A4 paper height
      ref={ref}
    >
      <div className="flex-grow"> {/* This wrapper will grow and push the footer down */}
        {/* Header */}
        <div className="flex justify-between items-start pb-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">Dr. S. M. Hasaan</h1>
            <p className="text-slate-700 font-semibold">MD</p>
            <p className="text-slate-700 font-semibold">Consultant Physician</p>
            <p className="text-slate-600">Reg No - 5961</p>
          </div>
          <div className="text-right text-slate-600 text-sm">
            <p className="font-semibold">Branch 1: Health Pharma, Main Road, Ranchi</p>
            <p className="font-semibold">Branch 2: Rahat Clinic, Kanta Toli, Ranchi</p>
            <p className="font-semibold">Branch 3: Sarwar Health Care, Somwar Bazar, Lohardaga</p>
          </div>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-slate-300 mb-6" />

        {/* Patient Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6 text-sm">
          <div className="flex items-baseline">
              <label className="font-bold text-slate-600 mr-2 whitespace-nowrap">Patient Name:</label>
              {isPdfMode ? <div className="text-slate-800 w-full pt-1 border-b border-dotted border-slate-400">{patientName}</div> : <input type="text" value={patientName} onChange={(e) => onPatientInfoChange('patientName', e.target.value)} className={patientInputBaseClasses}/>}
          </div>
          <div className="flex items-baseline">
              <label className="font-bold text-slate-600 mr-2">Date:</label>
              {isPdfMode ? <div className="text-slate-800 w-full pt-1 border-b border-dotted border-slate-400">{formatDateForDisplay(date)}</div> : <input type="date" value={date} onChange={(e) => onPatientInfoChange('date', e.target.value)} className={patientInputBaseClasses}/>}
          </div>
          <div className="flex items-baseline">
              <label className="font-bold text-slate-600 mr-2">Age:</label>
              {isPdfMode ? <div className="text-slate-800 w-full pt-1 border-b border-dotted border-slate-400">{age}</div> : <input type="text" value={age} onChange={(e) => onPatientInfoChange('age', e.target.value)} className={patientInputBaseClasses}/>}
          </div>
          <div className="flex items-baseline">
              <label className="font-bold text-slate-600 mr-2">Gender:</label>
              {isPdfMode ? <div className="text-slate-800 w-full pt-1 border-b border-dotted border-slate-400">{gender}</div> : (
                  <select value={gender} onChange={(e) => onPatientInfoChange('gender', e.target.value)} className={patientInputBaseClasses}>
                      <option>Male</option>
                      <option>Female</option>
                  </select>
              )}
          </div>
        </div>
        
        {/* Vitals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1">Blood Pressure (BP)</label>
            {isPdfMode ? (
              <div className="text-slate-800">{bp || '\u00A0'}</div>
            ) : (
              <input
                type="text"
                placeholder="e.g., 120/80 mmHg"
                value={bp}
                onChange={(e) => onVitalsChange('bp', e.target.value)}
                className={inputStyles}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1">Weight</label>
            {isPdfMode ? (
              <div className="text-slate-800">{weight || '\u00A0'}</div>
            ) : (
              <input
                type="text"
                placeholder="e.g., 70 kg"
                value={weight}
                onChange={(e) => onVitalsChange('weight', e.target.value)}
                className={inputStyles}
              />
            )}
          </div>
        </div>
        
        {/* Prescription Symbol and Body */}
        <div className="flex mb-8">
          <div className="text-6xl font-serif text-slate-400 mr-8 mt-4">Rx</div>
          <div className="flex-1">
            {/* Medicine Header */}
            <div className="grid grid-cols-12 gap-2 mb-2 font-semibold text-slate-600 text-sm">
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Medicine</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Timing</div>
              <div className="col-span-3">Instruction</div>
            </div>

            {/* Medicine List */}
            <div className="space-y-3">
              {medicines.map((med, index) => (
                <MedicineInputRow
                  key={med.id}
                  medicine={med}
                  index={index}
                  onMedicineChange={onMedicineChange}
                  onRemoveMedicine={onRemoveMedicine}
                  isPdfMode={isPdfMode}
                />
              ))}
            </div>
            
            {/* Add Medicine Button */}
            {!isPdfMode && (
              <button
                onClick={onAddMedicine}
                className="mt-4 flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add Medicine
              </button>
            )}
          </div>
        </div>

        {/* Investigation Section */}
        <div className="mt-8">
          <label className="block text-sm font-bold text-slate-600 mb-2">Investigation</label>
          <div className="space-y-3">
            {isPdfMode ? (
              investigations.filter(inv => inv.text.trim()).map(inv => (
                <div key={inv.id} className="text-slate-800">{inv.text}</div>
              ))
            ) : (
              investigations.map((inv, index) => (
                <div key={inv.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g., CBC, LFT"
                    value={inv.text}
                    onChange={(e) => onInvestigationChange(index, e.target.value)}
                    className={`${inputStyles} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveInvestigation(inv.id)}
                    className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"
                    aria-label="Remove investigation"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
          {!isPdfMode && (
            <button
              onClick={onAddInvestigation}
              className="mt-4 flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add Investigation
            </button>
          )}
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <label className="block text-sm font-bold text-slate-600 mb-1">Other Notes</label>
          {isPdfMode ? (
              <div className={`text-slate-800`}>{notes || '\u00A0'}</div>
          ) : (
              <textarea
              rows={2}
              placeholder="e.g., Follow up after 1 week."
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              className={`${inputStyles} h-auto`}
              />
          )}
        </div>

        {/* Signature Section */}
        <div className="flex justify-end mt-24">
          <div className="text-center w-64">
              <div className="border-t border-dotted border-slate-500 mb-2"></div>
              <p className="font-bold text-slate-800">Dr. S. M. Hasaan</p>
              <p className="text-sm text-slate-600">MD, Consultant Physician</p>
          </div>
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="text-center pt-8">
        <h2 className="font-bold text-slate-700">Valid for 10 days. Not of Medico Legal Purpose</h2>
      </div>
    </div>
  );
};

export default React.forwardRef(PrescriptionForm);