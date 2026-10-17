import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space, type as scale } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  /** Per category (§7.4). */
  placeholder: string;
  onFocus?: () => void;
  autoFocus?: boolean;
};

const s = component.searchField;

export function SearchField({ value, onChangeText, placeholder, onFocus, autoFocus }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  return (
    <Glass radius={radius.pill} style={styles.field}>
      <View style={styles.row}>
        <Icon name="search" size={s.iconSize} color={c.glassLabel} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={c.label2}
          accessibilityLabel={placeholder}
          returnKeyType="search"
          style={[styles.input, scale.body, { color: c.glassLabel }]}
        />
        {value.length > 0 && (
          <IconButton
            icon="clear"
            accessibilityLabel={t('common.clear')}
            onPress={() => onChangeText('')}
            color={c.label2}
          />
        )}
      </View>
    </Glass>
  );
}

const styles = StyleSheet.create({
  field: { minHeight: s.height, justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingStart: s.padding, gap: space.space2 },
  // Height comes from the field; the input fills it so the whole capsule is a 44 pt target.
  input: { flex: 1, minHeight: s.height, paddingVertical: 0, textAlign: 'auto' },
});
