import React from 'react';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import { Card, Subheading as Text, Paragraph, Divider, Title, Button, Colors } from 'react-native-paper';
import { theme } from '../../global';
import NavigationService from '../../navigation/navigationService'
import store from '../../redux/store'
import { SET_SALE_CUSTOMER } from '../../redux/actions/types'

const dividerStyles = { marginVertical: 10, marginBottom: 20 }

class ChooseCustomerCard extends React.Component {

  state = {
    expanded: true
  }

  _renderCustomerDetailsRow = (heading = '', detail = '', color) => {
    return (
      <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
        <Paragraph style={{ fontFamily: theme.fonts.medium }}>{heading}</Paragraph>
        {detail.length > 0 ?
          <Paragraph
            style={{ fontFamily: theme.fonts.light, color: color ? color : theme.colors.text }}
            color={color ? color : theme.colors.text}
          >
            {detail}
          </Paragraph> : null
        }
      </View>
    );
  }

  _renderCustomerDetails = () => {
    const { customer } = this.props;

    const { street, city, state, dob, drivers_license, sex } = customer;
    let gender;
    if (sex.toUpperCase() === 'F')
      gender = 'Female';
    else
      gender = 'Male';

    return (
      <React.Fragment>
        <Divider style={dividerStyles} />
        {this._renderCustomerDetailsRow('Gender: ', `${gender}`)}
        {this._renderCustomerDetailsRow('Address: ', `${street} \n${city}, ${state}`)}
        {this._renderCustomerDetailsRow('Driver\'s License: ', `${drivers_license.toUpperCase()}`)}
        {this._renderCustomerDetailsRow('Birth Date: ', `${dob}`)}
        <Divider style={{ marginBottom: 10, marginTop: 10 }} />
      </React.Fragment>
    );
  }

  _onSelectCustomer = () => {
    store.dispatch({ type: SET_SALE_CUSTOMER, payload: this.props.customer })
    NavigationService.navigate('CreateSaleScreen')
  }

  render() {
    const { customer } = this.props;
    return (
      <Card
        elevation={5}
        style={styles.container}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          this.setState((prevState) => { return { expanded: !prevState.expanded } })
        }}
      >
        <Card.Content>
          <Title style={{ paddingTop: 5, paddingBottom: 5, fontSize: 23 }}>
            {`${customer.first_name} ${customer.last_name}`}
          </Title>
          {this.state.expanded && this._renderCustomerDetails()}
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button color={Colors.green700} mode='contained' style={{ margin: 5, marginTop: 0 }} onPress={this._onSelectCustomer}>MAKE SALE</Button>
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 15

  }
})

export { ChooseCustomerCard };
