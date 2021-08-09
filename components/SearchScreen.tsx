import React from "react";
import {View, Text} from "./Themed";
import { Searchbar } from 'react-native-paper';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

  return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}

        />

  )
}

export default SearchScreen;
