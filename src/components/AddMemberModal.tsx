import React, { useState } from 'react';
import { X, UserPlus, Image as ImageIcon } from 'lucide-react';
import type { FamilyMember } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMember: FamilyMember) => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
];

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('SON');
  const [selectedImage, setSelectedImage] = useState(AVATAR_OPTIONS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      relation: relation.toUpperCase(),
      image: selectedImage,
    };

    onAdd(newMember);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#6B38D4]">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Add Family Member</h3>
            <p className="text-xs text-gray-500">Include a new member for medical assistance</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lucas Brock"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6B38D4] focus:border-transparent text-sm text-gray-900"
            />
          </div>

          {/* Relation Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Relationship
            </label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6B38D4] focus:border-transparent text-sm text-gray-900 bg-white"
            >
              <option value="SON">SON</option>
              <option value="DAUGHTER">DAUGHTER</option>
              <option value="SPOUSE">SPOUSE</option>
              <option value="MOTHER">MOTHER</option>
              <option value="FATHER">FATHER</option>
              <option value="SIBLING">SIBLING</option>
              <option value="GRANDPARENT">GRANDPARENT</option>
            </select>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
              <span>Select Profile Avatar</span>
            </label>
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {AVATAR_OPTIONS.map((imgUrl, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative rounded-full overflow-hidden w-12 h-12 shrink-0 border-2 transition-all ${
                    selectedImage === imgUrl
                      ? 'border-[#6B38D4] scale-110 shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#6B38D4] to-[#5C24FF] text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
