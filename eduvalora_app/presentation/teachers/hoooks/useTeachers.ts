import { getTeachers } from '@/core/teachers/actions/teacher-action';
import { useQuery } from '@tanstack/react-query';

export default function useTeachers() {
  const getTeachersQuery = useQuery({
    queryKey: ['teachers'],
    queryFn: () => getTeachers(),
    /* staleTime: 1000 * 60 * 60, // 1 hora */
  });

  return {
    getTeachersQuery: getTeachersQuery,
    isLoading: getTeachersQuery.isLoading,
    data: getTeachersQuery.data,
    isError: getTeachersQuery.isError,
  };
}
