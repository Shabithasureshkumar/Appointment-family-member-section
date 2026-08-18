import { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { MedicalLogo } from './components/MedicalLogo';
import { PageIntro } from './components/PageIntro';
import { FamilyMemberCard } from './components/FamilyMemberCard';
import { AddMemberCard } from './components/AddMemberCard';
import { AddMemberModal } from './components/AddMemberModal';
import { ConfirmDialog } from './components/ConfirmDialog';
import { ActionButtons } from './components/ActionButtons';
import { PrivacyMessage } from './components/PrivacyMessage';
import { EmptyState } from './components/EmptyState';
import { Toast } from './components/Toast';
import { Container } from './components/ui/Container';
import { useFamilyMembers } from './hooks/useFamilyMembers';
import { useNotification } from './hooks/useNotification';
import { DEFAULT_NAV_TAB } from './data/navigation';
import type { FamilyMember, NavItem, NewMemberDraft } from './types';

export function App() {
  const { members, selectedId, selectedMember, selectMember, addMember, removeMember } =
    useFamilyMembers();
  const { notification, notify } = useNotification();

  const [activeTab, setActiveTab] = useState<NavItem>(DEFAULT_NAV_TAB);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [memberPendingRemoval, setMemberPendingRemoval] = useState<FamilyMember | null>(null);

  const isLastMember = members.length <= 1;

  const handleConfirmSelection = () => {
    if (!selectedMember) return;
    notify(
      `Selection confirmed! Medical assistance requested for ${selectedMember.name} (${selectedMember.relation}).`,
      'success',
    );
  };

  const handleAddMember = (draft: NewMemberDraft) => {
    const result = addMember(draft);
    if (result.ok) {
      notify(`${result.member.name} added successfully!`, 'success');
    }
    // A failure is surfaced inside the form, which keeps the dialog open.
    return result;
  };

  const handleRequestRemoval = () => {
    if (!selectedMember) return;
    if (isLastMember) {
      notify('Cannot remove the last remaining family member.', 'warning');
      return;
    }
    setMemberPendingRemoval(selectedMember);
  };

  const handleConfirmRemoval = () => {
    if (!memberPendingRemoval) return;
    const result = removeMember(memberPendingRemoval.id);
    setMemberPendingRemoval(null);

    if (result.ok) {
      notify(`${result.removed.name} has been removed from your family profile.`, 'info');
    } else {
      notify(result.error, 'warning');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-white selection:bg-purple-100 selection:text-purple-900">
      {/*
        Background Soft Purple Radial Glows.
        The clipping lives on this decorative layer alone. The page root is left
        unclipped on purpose, so real content overflow shows up as a scrollbar
        during development instead of being silently hidden.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="glow-left absolute -top-20 -left-20 h-[450px] w-[450px] rounded-full opacity-40 sm:h-[600px] sm:w-[600px]" />
        <div className="glow-right absolute -right-20 -bottom-20 h-[450px] w-[450px] rounded-full opacity-40 sm:h-[600px] sm:w-[600px]" />
      </div>

      <Toast notification={notification} />

      {/* Main Page Layout Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* 1. Top Navigation */}
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/*
          Main Content Area. The content sits directly on the page — there is no
          enclosing rounded panel — so the ambient glow reads as page background
          rather than as a card sitting on top of it.
        */}
        <Container
          as="main"
          className="flex flex-1 flex-col items-center py-10 md:py-14 lg:py-16"
        >
          {/* 2. Medical Logo */}
          <MedicalLogo />

          {/* 3. Main Heading & Subtitle */}
          <PageIntro />

          {/* 4. Family Member Cards Row */}
          <div className="mx-auto mt-12 w-full max-w-[940px] md:mt-14">
            {members.length === 0 ? (
              <EmptyState onAddMember={() => setIsAddModalOpen(true)} />
            ) : (
              /*
                auto-fit tracks rather than fixed column counts: the column count
                follows the available width continuously, so there is no abrupt
                jump at a breakpoint and no column ever grows far wider than the
                card inside it. The three minimums are tuned to match the approved
                design — 1 column at 320px, 2 from 360px, 3 from 640px, 4 in the
                tablet range and exactly 5 from 900px up, never 6.
              */
              <div
                role="group"
                aria-label="Family members"
                className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] items-start justify-items-center gap-4 sm:gap-6 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:gap-10"
              >
                {members.map((member) => (
                  <FamilyMemberCard
                    key={member.id}
                    member={member}
                    isSelected={member.id === selectedId}
                    onSelect={selectMember}
                  />
                ))}

                {/* Add Member Card */}
                <AddMemberCard onAddMember={() => setIsAddModalOpen(true)} />
              </div>
            )}
          </div>

          {/* 5. Action Buttons (Confirm / Remove) */}
          <div className="mt-12 w-full md:mt-14">
            <ActionButtons
              selectedMemberName={selectedMember ? selectedMember.name : null}
              onConfirm={handleConfirmSelection}
              onRemove={handleRequestRemoval}
              disableRemove={isLastMember}
            />
          </div>

          {/* 6. Privacy Message */}
          <PrivacyMessage />
        </Container>
      </div>

      {/* Dialogs are mounted only while open so their state starts clean each time. */}
      {isAddModalOpen ? (
        <AddMemberModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddMember} />
      ) : null}

      {memberPendingRemoval ? (
        <ConfirmDialog
          title={`Remove ${memberPendingRemoval.name}?`}
          description={`This will remove ${memberPendingRemoval.name} (${memberPendingRemoval.relation}) from your family members.`}
          confirmLabel="Remove Member"
          onConfirm={handleConfirmRemoval}
          onCancel={() => setMemberPendingRemoval(null)}
        />
      ) : null}
    </div>
  );
}

export default App;
