import * as React from 'react';
import {Searchbar} from 'react-native-paper';
import {View} from "react-native";
import {useTranslation} from "react-i18next";

interface Props {
  onChange: (searchValue: string) => void;
}

const SearchBarComponent = (props: Props) => {
  const {t, i18n} = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    props.onChange(query);
  }

  return (
    <View>
      <Searchbar
        placeholder={t('search-bar.placeholder')}
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{width: '100%'}}
      />
    </View>

  );
};

export default SearchBarComponent;
