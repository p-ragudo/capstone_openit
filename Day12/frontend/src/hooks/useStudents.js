import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudents must be used within StudentProvider');
  return ctx;
}
