import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, LayoutAnimation, View } from 'react-native';
import { Card, Title, Caption, Button, Colors, Subheading, Paragraph, Text, Divider } from 'react-native-paper';
import { theme } from '../../global'
import navigationService from '../../navigation/navigationService';


class VisitCard extends React.Component {

  state = {
    expanded: true
  }

  constructor(props) {
    super(props);
    const { sale, customers, visit } = this.props;

    this.customer = customers.find(customer => customer.id === visit.customer_id);
    // this.vehicle = vehicles.find(vehicle => vehicle.id === sale.vehicle_id);
  }

  _renderVisitDetailsRow = (heading = '', detail = '', color) => {
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

  _renderVisitDetails = () => {
    const { visit } = this.props;
    const { customer } = this;

    const dividerStyles = { marginVertical: 10 }

    return (
      <React.Fragment>
        <Divider style={dividerStyles} />
        <Title style={{ paddingTop: 5, paddingBottom: 5, fontSize: 18, textDecorationLine: 'underline' }}>
          {`Customer Details`}
        </Title>
        {this._renderVisitDetailsRow('Name: ', `${customer.first_name} ${customer.last_name}`, Colors.blue600)}
        {this._renderVisitDetailsRow('Address: ', `${customer.street} \n${customer.city}, ${customer.state}`)}
        {this._renderVisitDetailsRow('Driver\'s License: ', `${customer.drivers_license.toUpperCase()}`)}
        {this._renderVisitDetailsRow('Birth Date: ', `${customer.dob}`)}
        <View style={{marginVertical: 5}}/>
      </React.Fragment>
    );
  }

  render() {
    const { visit } = this.props;
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
            {visit.date}
          </Title>
          {this.state.expanded && this._renderVisitDetails()}
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-start' }}>
          {/* <Button color={Colors.blue500} mode='contained' style={{ margin: 5, marginTop: 0 }} onPress={this._navigateReceiptScreenPDF}>View Receipt</Button> */}
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

const ConnectedComponent = connect(mapStateToProps)(VisitCard);
export { ConnectedComponent as VisitCard }
