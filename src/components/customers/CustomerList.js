import React from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Title, Caption, Searchbar, Button } from 'react-native-paper';
import { CustomerCard } from './CustomerCard';
import { theme } from '../../global';
import { SearchableFlatList } from "react-native-searchable-list";
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../../navigation/navigationService';

class CustomerList extends React.Component {

  state = {
    // data: [...this.props.customers],
    searchTerm: "",
    searchAttribute: "last_name",
    ignoreCase: true
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderHeaderComponent = () => {
    const { customers } = this.props;

    return (
      <View style={styles.listHeader}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 10}}>
        <Title style={styles.listHeaderTitle}>Customers</Title>
        <Button onPress={() => {
                    NavigationService.navigate('CreateCustomerScreen')
        }}>
          Add
        </Button>
        </View>
        <Caption style={styles.listSubheaderTitle}>{`${customers.length} customers`}</Caption>
      </View>
    );
  }

  render() {

    const { data, searchTerm, searchAttribute, ignoreCase } = this.state;
    return (
      <React.Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => NavigationService.navigate('DashboardScreen')} style={{ paddingRight: 20, paddingVertical: 10, paddingLeft: 0, justifyContent: 'center' }}>
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
          style={styles.list} data={this.props.customers} searchTerm={searchTerm}
          searchAttribute={searchAttribute} ignoreCase={ignoreCase}
          renderItem={({ item }) => (<CustomerCard customer={item} key={item.id} />)}
          keyExtractor={item => item.id.toString()} 
          extraData={this.props.customers}
          />
      </React.Fragment>
    )
  }

  renderTemp() {
    const { customers } = this.props;
    return (
      <FlatList
        data={customers}
        renderItem={({ item }) => <CustomerCard customer={item} key={item.id} />}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this._renderHeaderComponent}
      />
    );
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

export { CustomerList }