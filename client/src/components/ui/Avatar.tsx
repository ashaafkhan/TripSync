import { getInitials } from '../../utils/getInitials';
import { clsx } from 'clsx';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  title?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const bgColors = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-sky-500',
  'bg-rose-500', 'bg-amber-500', 'bg-violet-500',
];

function getColorForName(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return bgColors[sum % bgColors.length];
}

export function Avatar({ name, src, size = 'md', className, title }: AvatarProps) {
  const initials = getInitials(name);
  const color = getColorForName(name);

  return (
    <div
      title={title ?? name}
      className={clsx(
        'rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white overflow-hidden shrink-0',
        sizeClasses[size],
        !src && color,
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        initials
      )}
    </div>
  );
}

interface AvatarGroupProps {
  users: { name: string; src?: string; id: string }[];
  max?: number;
  size?: AvatarProps['size'];
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const shown = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {shown.map((u) => (
        <Avatar key={u.id} name={u.name} src={u.src} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={clsx(
            'rounded-full bg-[#E0E0E0] text-[#6B7280] flex items-center justify-center font-semibold ring-2 ring-white',
            sizeClasses[size],
            'text-xs',
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
