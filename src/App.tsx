import { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { MedicalLogo } from './components/MedicalLogo';
import { PageIntro } from './components/PageIntro';
import { FamilyMemberCard } from './components/FamilyMemberCard';
import { AddMemberCard } from './components/AddMemberCard';
import { AddMemberModal } from './components/AddMemberModal';
import { ActionButtons } from './components/ActionButtons';
import { PrivacyMessage } from './components/PrivacyMessage';
import type { FamilyMember } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const INITIAL_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    name: 'David Brock',
    relation: 'SELF',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Sarah Brock',
    relation: 'MOTHER',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Michael Brock',
    relation: 'FATHER',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Emma Brock',
    relation: 'DAUGHTER',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
];

export function App() {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'info' | 'warning';
    message: string;
  } | null>(null);

  const selectedMember = members.find((m) => m.id === selectedId) || members[0];

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSelectMember = (id: string) => {
    setSelectedId(id);
  };

  const handleConfirmSelection = () => {
    if (!selectedMember) return;
    showNotification(
      `Selection confirmed! Medical assistance requested for ${selectedMember.name} (${selectedMember.relation}).`,
      'success'
    );
  };

  const handleRemoveMember = () => {
    if (!selectedMember) return;
    if (members.length <= 1) {
      showNotification('Cannot remove the last remaining family member.', 'warning');
      return;
    }

    const removedName = selectedMember.name;
    const updatedMembers = members.filter((m) => m.id !== selectedId);
    setMembers(updatedMembers);

    // Select the first remaining member automatically
    if (updatedMembers.length > 0) {
      setSelectedId(updatedMembers[0].id);
    }

    showNotification(`${removedName} has been removed from your family profile.`, 'info');
  };

  const handleAddMember = (newMember: FamilyMember) => {
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    setSelectedId(newMember.id);
    showNotification(`${newMember.name} added successfully!`, 'success');
  };

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden flex flex-col justify-between selection:bg-purple-100 selection:text-purple-900">
      {/* Background Soft Purple Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] glow-left rounded-full opacity-40 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] glow-right rounded-full opacity-40 z-0"
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce-short">
          <div
            className={`flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-md border ${
              notification.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-700/50'
                : notification.type === 'warning'
                ? 'bg-amber-900/90 text-white border-amber-700/50'
                : 'bg-purple-900/90 text-white border-purple-700/50'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Page Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top Navigation */}
        <TopNavigation />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-6 md:py-10 max-w-[1253px] w-full mx-auto">
          {/* Main Selection Wrapper Card with Glassmorphism */}
          <div className="w-full bg-white/40 backdrop-blur-[36px] rounded-[29px] p-4 sm:p-8 md:p-10 flex flex-col items-center border border-white/60 shadow-2xs transition-all">
            {/* 2. Medical Logo */}
            <MedicalLogo />

            {/* 3. Main Heading & Subtitle */}
            <PageIntro />

            {/* 4. Family Member Cards Row */}
            <div className="w-full max-w-[1010px] mx-auto my-6 sm:my-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-items-center items-center">
                {members.map((member) => (
                  <FamilyMemberCard
                    key={member.id}
                    member={member}
                    isSelected={member.id === selectedId}
                    onSelect={handleSelectMember}
                  />
                ))}

                {/* Add Member Card */}
                <AddMemberCard onAddMember={() => setIsAddModalOpen(true)} />
              </div>
            </div>

            {/* 5. Action Buttons (Confirm / Remove) */}
            <ActionButtons
              selectedMemberName={selectedMember ? selectedMember.name : ''}
              onConfirm={handleConfirmSelection}
              onRemove={handleRemoveMember}
              disableRemove={members.length <= 1}
            />

            {/* 6. Privacy Message */}
            <PrivacyMessage />
          </div>
        </main>
      </div>

      {/* Interactive Add Member Modal */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
}

export default App;
