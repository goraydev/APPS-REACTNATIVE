import { getTeacherById } from '@/core/teachers/actions/teacher-action';
import { useQuery } from '@tanstack/react-query';

export default function useTeacher(id: number) {
  const getTeacherByIdQuery = useQuery({
    queryKey: ['teacher', id],
    queryFn: () => getTeacherById(id),
    staleTime: 1000 * 60 * 60, // 1 hora
    enabled: !!id,
  });

  return {
    getTeacherByIdQuery: getTeacherByIdQuery,
    isLoading: getTeacherByIdQuery.isLoading,
    data: getTeacherByIdQuery.data,
    isError: getTeacherByIdQuery.isError,
  };
}
