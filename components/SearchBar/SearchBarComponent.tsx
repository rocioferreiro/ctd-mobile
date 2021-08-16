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
            placeholder="Search for Challenges"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{width:    '100%'}}


        />
    );
};

export default SearchBarComponent;
