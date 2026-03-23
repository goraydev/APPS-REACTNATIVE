import { getFaculties } from '@/core/auth/actions/auth-action';
import { useQuery } from '@tanstack/react-query';

export const useFaculties = () => {
  const facultiesQuery = useQuery({
    queryKey: ['faculties'],
    queryFn: () => getFaculties(),
    staleTime: Infinity,
  });

  return {
    facultiesQuery,
  };
};