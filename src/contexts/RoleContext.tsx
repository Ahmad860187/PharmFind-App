import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'patient' | 'pharmacist';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isPharmacist: boolean;
  isPatient: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('user_role');
    return (saved as UserRole) || 'patient';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('user_role', newRole);
  };

  useEffect(() => {
    localStorage.setItem('user_role', role);
  }, [role]);

  return (
    <RoleContext.Provider 
      value={{ 
        role, 
        setRole,
        isPharmacist: role === 'pharmacist',
        isPatient: role === 'patient'
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
