import * as React from 'react';
import {Searchbar, useTheme} from 'react-native-paper';
import {View} from "react-native";

interface Props {
    onChange: (searchValue: string) => void;
}

const SearchBarComponent = (props: Props) => {
    const {colors} = useTheme()
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        props.onChange(query);
    }

    return (
      <View>
          <Searchbar
            placeholder="Search for Challenges"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{width:    '100%'}}
          />
      </View>

    );
};

export default SearchBarComponent;
