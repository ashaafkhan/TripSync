import type { Trip, User } from '../../types';
import { TripCard } from './TripCard';

interface TripGridProps {
  trips: Trip[];
  currentUserId: string;
  memberMap: Record<string, User[]>;
}

export function TripGrid({ trips, currentUserId, memberMap }: TripGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {trips.map((trip) => {
        const userMember = trip.members.find((m) => m.userId === currentUserId);
        const role = userMember?.role ?? 'viewer';
        const members = memberMap[trip.id] ?? [];
        return <TripCard key={trip.id} trip={trip} userRole={role} members={members} />;
      })}
    </div>
  );
}
