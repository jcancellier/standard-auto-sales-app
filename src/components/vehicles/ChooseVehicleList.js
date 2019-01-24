import React from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Title, Caption, Searchbar } from 'react-native-paper';
import { ChooseVehicleCard } from './ChooseVehicleCard';
import { theme } from '../../global';
import { SearchableFlatList } from "react-native-searchable-list";
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../../navigation/navigationService';

class ChooseVehicleList extends React.PureComponent {

  state = {
    data: [...this.props.vehicles],
    searchTerm: "",
    searchAttribute: "maker.make",
    ignoreCase: true
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderHeaderComponent = () => {
    const { vehicles } = this.props;
    return (
      <View style={styles.listHeader}>
        <Title style={styles.listHeaderTitle}>Vehicles</Title>
        <Caption style={styles.listSubheaderTitle}>{`${vehicles.length} in stock`}</Caption>
      </View>
    );
  }

  render() {
    const { data, searchTerm, searchAttribute, ignoreCase } = this.state;
    return (
      <React.Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => NavigationService.navigate('CreateSaleScreen')} style={{ paddingRight: 20, paddingVertical: 10, paddingLeft: 0, justifyContent: 'center' }}>
            <Ionicons name="md-close" size={20} color={theme.colors.text} style={{ paddingLeft: 14 }} />
          </TouchableOpacity>
          <Searchbar
            placeholder="Search"
            onChangeText={searchTerm => this.setState({ searchTerm })}
            value={searchTerm}
            style={styles.searchbar}
          />
        </View>
        <SearchableFlatList
          ListHeaderComponent={this._renderHeaderComponent}
          style={styles.list} data={data} searchTerm={searchTerm}
          searchAttribute={searchAttribute} ignoreCase={ignoreCase}
          renderItem={({ item }) => (<ChooseVehicleCard vehicle={item} key={item.id} />)}
          keyExtractor={item => item.id.toString()}
        />
      </React.Fragment>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 35
  },
  searchbar: {
    flex: 9,
    marginRight: 20,
    backgroundColor: theme.colors.background
  },
  headerLeft: {
    flex: 1
  },
  listHeader: {
    marginLeft: 14,
    paddingBottom: 25,
    paddingTop: 15
  },
  listHeaderTitle: {
    fontSize: 30,
    fontFamily: theme.fonts.medium
  },
  listSubheaderTitle: {
    fontSize: 15,
    paddingBottom: 15
  }
})

export { ChooseVehicleList }