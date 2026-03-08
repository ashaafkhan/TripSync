import { type ReactNode } from 'react';
import { usePermissions } from '../../hooks/usePermissions';

interface PermissionGateProps {
  require: 'canEdit' | 'canInvite' | 'canManageRoles' | 'canDeleteTrip' | 'canAddExpense' | 'canUploadFiles' | 'canComment' | 'canReorder';
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ require, children, fallback = null }: PermissionGateProps) {
  const permissions = usePermissions();
  return permissions[require] ? <>{children}</> : <>{fallback}</>;
}
