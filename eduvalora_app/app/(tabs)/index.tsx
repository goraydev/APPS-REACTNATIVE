import ThemedText from '@/presentation/shared/ThemedText';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';

export default function Home() {
  return (
    <>
      <ThemedHeader title="Eduvalora" />
      <ThemedView padding>
        <ThemedText>Holaa</ThemedText>
      </ThemedView>
    </>
  );
}
