import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Subheading as Text } from 'react-native-paper';
import NavigationService from '../../navigation/navigationService'

const CustomerCard = ({ customer }) => {
  return (
    <Card 
      elevation={5}
      style={styles.container} 
      onPress={() => {
        NavigationService.navigate('CreateCustomerScreen', {
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

export { CustomerCard };
