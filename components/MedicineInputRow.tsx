import React from 'react';
import { Medicine } from '../types';
import { TYPE_OPTIONS, TIMING_OPTIONS, INSTRUCTION_OPTIONS } from '../constants';
import TrashIcon from './icons/TrashIcon';

interface MedicineInputRowProps {
  medicine: Medicine;
  index: number;
  onMedicineChange: (index: number, field: keyof Omit<Medicine, 'id'>, value: string) => void;
  onRemoveMedicine: (id: string) => void;
  isPdfMode?: boolean;
}

const MedicineInputRow: React.FC<MedicineInputRowProps> = ({
  medicine,
  index,
  onMedicineChange,
  onRemoveMedicine,
  isPdfMode = false,
}) => {

  const inputStyles = "w-full p-2 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-md border border-gray-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition";

  if (isPdfMode) {
    // Render plain text if medicine name exists, otherwise render an empty row to maintain layout
    if (!medicine.name && !medicine.quantity) return null;
    return (
      <div className="grid grid-cols-12 gap-4 items-center text-slate-800 text-sm">
        <div className="col-span-2">{medicine.type}</div>
        <div className="col-span-3">{medicine.name}</div>
        <div className="col-span-2">{medicine.quantity}</div>
        <div className="col-span-2">{medicine.timing}</div>
        <div className="col-span-3">{medicine.instruction}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-2">
        <select
          value={medicine.type}
          onChange={(e) => onMedicineChange(index, 'type', e.target.value)}
          className={`${inputStyles} appearance-none`}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="col-span-3">
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicine.name}
          onChange={(e) => onMedicineChange(index, 'name', e.target.value)}
          className={inputStyles}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          placeholder="e.g., 30"
          value={medicine.quantity}
          onChange={(e) => onMedicineChange(index, 'quantity', e.target.value)}
          className={inputStyles}
        />
      </div>
      <div className="col-span-2">
        <select
          value={medicine.timing}
          onChange={(e) => onMedicineChange(index, 'timing', e.target.value)}
          className={`${inputStyles} appearance-none`}
        >
          {TIMING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <select
          value={medicine.instruction}
          onChange={(e) => onMedicineChange(index, 'instruction', e.target.value)}
          className={`${inputStyles} appearance-none`}
        >
          {INSTRUCTION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          onClick={() => onRemoveMedicine(medicine.id)}
          className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"
          aria-label="Remove medicine"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MedicineInputRow;