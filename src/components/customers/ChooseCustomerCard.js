import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Subheading as Text } from 'react-native-paper';
import NavigationService from '../../navigation/navigationService'
import store from '../../redux/store'
import { SET_SALE_CUSTOMER } from '../../redux/actions/types'


const ChooseCustomerCard = ({ customer }) => {
  return (
    <Card
      elevation={5}
      style={styles.container}
      onPress={() => {
        store.dispatch({ type: SET_SALE_CUSTOMER, payload: customer })
        NavigationService.navigate('CreateSaleScreen', {
          name: `${customer.first_name} ${customer.last_name}`
        })
      }}
    >
      <Card.Content>
        <Text>
          {`${customer.first_name} ${customer.last_name}`}
        </Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 15

  }
})

export { ChooseCustomerCard };
