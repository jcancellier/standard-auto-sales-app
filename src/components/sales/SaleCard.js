import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, LayoutAnimation, View } from 'react-native';
import { Card, Title, Caption, Button, Colors, Subheading, Paragraph, Text, Divider } from 'react-native-paper';
import NavigationService from '../../navigation/navigationService'
import { theme } from '../../global'
import navigationService from '../../navigation/navigationService';


class SaleCard extends React.Component {

  state = {
    expanded: true
  }

  constructor(props) {
    super(props);
    const { sale, customers, vehicles } = this.props;

    this.customer = customers.find(customer => customer.id === sale.customer_id);
    this.vehicle = vehicles.find(vehicle => vehicle.id === sale.vehicle_id);

    // console.log(this.customer);
  }


  componentDidMount() {

  }

  _renderSaleDetailsRow = (heading = '', detail = '', color) => {
    return (
      <View style={{ flexDirection: 'row' }}>
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

  _renderSaleDetails = () => {
    const { sale } = this.props;

    const dividerStyles = { marginVertical: 10 }

    return (
      <React.Fragment>
        <Divider style={dividerStyles} />
        {this._renderSaleDetailsRow('Customer: ', `${this.customer.first_name} ${this.customer.last_name}`, Colors.blue600)}
        <Divider style={dividerStyles} />
        {this._renderSaleDetailsRow('Vehicle: ', `${this.vehicle.maker.make} ${this.vehicle.maker.model}`, Colors.red200)}
        <Divider style={dividerStyles} />
      </React.Fragment>
    );
  }

  _navigateReceiptScreenPDF = () => {
    const { customer, vehicle } = this;
    const { sale, salesperson } = this.props;

    navigationService.navigate(
      'SaleReceiptScreenPDF',
      {
        sale,
        customer,
        vehicle,
        salesperson
      }
    )
}

render() {
  const { sale } = this.props;
  // let date = new Date(sale.date);
  return (
    <Card
      style={styles.container}
      elevation={7}
      onPress={() => {
        LayoutAnimation.easeInEaseOut();
        this.setState((prevState) => { return { expanded: !prevState.expanded } })
      }}
    >
      <Card.Content>
        <Title style={{ paddingTop: 5, paddingBottom: 5, fontSize: 22 }}>
          {sale.date}
        </Title>
        {this.state.expanded && this._renderSaleDetails()}
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'flex-start' }}>
        <Button color={Colors.blue500} mode='contained' style={{ margin: 5, marginTop: 0 }} onPress={this._navigateReceiptScreenPDF}>View Receipt</Button>
      </Card.Actions>
    </Card>
  )
}
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 15,
  }
})

const mapStateToProps = (state) => {
  return {
    customers: state.customers.customers,
    vehicles: state.vehicles.vehicles,
    salesperson: state.auth.salesperson
  }
}

const ConnectedComponent = connect(mapStateToProps)(SaleCard);
export { ConnectedComponent as SaleCard }
