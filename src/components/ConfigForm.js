import React from 'react';
import { Plus, Minus } from 'lucide-react';

const ConfigForm = ({
  thuTu,
  dangThuc,
  idDeThi,
  soId,
  idMonHoc,
  idTrangThai,
  onThuTuChange,
  onDangThucChange,
  onIdDeThiChange,
  onSoIdChange,
  onIdMonHocChange,
  onIdTrangThaiChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thứ tự câu hỏi (Manual mode)
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onThuTuChange(Math.max(1, thuTu - 1))}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={thuTu}
            onChange={(e) => onThuTuChange(parseInt(e.target.value) || 1)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center font-bold"
          />
          <button
            onClick={() => onThuTuChange(thuTu + 1)}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dạng thức (Manual mode)
        </label>
        <select
          value={dangThuc}
          onChange={(e) => onDangThucChange(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value={1}>DangThuc 1 (A, B, C, D)</option>
          <option value={2}>DangThuc 2 (a, b, c, d)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IdDeThi
        </label>
        <input
          type="text"
          value={idDeThi}
          onChange={(e) => onIdDeThiChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SoId
        </label>
        <input
          type="text"
          value={soId}
          onChange={(e) => onSoIdChange(e.target.value)}
          placeholder="Optional"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IdMonHoc
        </label>
        <input
          type="text"
          value={idMonHoc}
          onChange={(e) => onIdMonHocChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IdTrangThai
        </label>
        <input
          type="text"
          value={idTrangThai}
          onChange={(e) => onIdTrangThaiChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
};

export default ConfigForm;

