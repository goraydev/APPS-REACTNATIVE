import { useQuery } from '@tanstack/react-query';
import { getCalificationsComments } from '@/core/teachers/actions/teacher-action';

export default function useGetCalificationsComments(id_teacher: number) {
  const getCalificationsCommentsQuery = useQuery({
    queryKey: ['califications_comments', id_teacher],
    queryFn: () => getCalificationsComments(id_teacher),
     enabled: !!id_teacher,
  });

  return {
    getCalificationsCommentsQuery: getCalificationsCommentsQuery,
    isLoadingCalificationsComments: getCalificationsCommentsQuery.isLoading,
    dataCalificationsComments: getCalificationsCommentsQuery.data,
    isError: getCalificationsCommentsQuery.isError,
  };
}
