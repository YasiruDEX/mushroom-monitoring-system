import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, PaperProvider, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  const getLanguageName = (lang: string) => {
    switch(lang) {
      case 'en': return 'English';
      case 'si': return 'සිංහල';
      case 'ta': return 'தமிழ்';
      default: return 'English';
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button 
            onPress={openMenu} 
            mode="outlined" 
            icon="translate"
            style={{ borderColor: theme.colors.primary }}
          >
            {getLanguageName(i18n.language)}
          </Button>
        }>
        <Menu.Item onPress={() => changeLanguage('en')} title="English" leadingIcon="ab-testing" />
        <Divider />
        <Menu.Item onPress={() => changeLanguage('si')} title="සිංහල" />
        <Divider />
        <Menu.Item onPress={() => changeLanguage('ta')} title="தமிழ்" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageSwitcher;
