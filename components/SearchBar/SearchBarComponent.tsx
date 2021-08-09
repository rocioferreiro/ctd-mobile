import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface Props {
    onChange: (searchValue: string) => void;
}

const SearchBarComponent = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        props.onChange(query);
    }

    return (
        <Searchbar
            placeholder="Search for Challenegs"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};

export default SearchBarComponent;
