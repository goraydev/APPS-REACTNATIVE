import { Reply } from '@/core/teachers/interfaces/teachers';
import ThemedText from '@/presentation/shared/ThemedText';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  reply: Reply & { children?: Reply[] };
  id_comentrating: number;
  id_teacher: number;
  level?: number;
  isLast?: boolean;
  onReplyTo: (id_comentrating: number, parent_answer_id: number | null, username: string) => void;
}

export default function ReplyItem({
  reply,
  id_comentrating,
  id_teacher,
  level = 0,
  onReplyTo,
}: Props) {
  const currentLevel = Math.min(level, 4);

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>{reply.username?.at(0)?.toUpperCase()}</ThemedText>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.userRow}>
            <ThemedText style={styles.username}>{reply.username}</ThemedText>
            {reply.parent_username && (
              <ThemedText style={styles.replyTarget}>@{reply.parent_username}</ThemedText>
            )}
          </View>
          <ThemedText style={styles.answerText}>{reply.answer}</ThemedText>
          <View style={styles.meta}>
            <ThemedText style={styles.timeText}>
              {new Date(reply.created_at).toLocaleDateString('es-PE')}
            </ThemedText>
            <Pressable onPress={() => onReplyTo(id_comentrating, reply.id_answer, reply.username)}>
              <ThemedText style={styles.replyBtn}>Responder</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      {reply.children && reply.children.length > 0 && (
        <View style={{ marginLeft: currentLevel * 10 }}>
          {reply.children.map((child, index) => (
            <ReplyItem
              key={child.id_answer}
              reply={child}
              id_comentrating={id_comentrating}
              id_teacher={id_teacher}
              level={currentLevel + 1}
              isLast={index === reply.children!.length - 1}
              onReplyTo={onReplyTo} // ← se propaga hacia abajo
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#be185d',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  username: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  replyTarget: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  answerText: {
    fontSize: 13,
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#9ca3af',
  },
  replyBtn: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
});
