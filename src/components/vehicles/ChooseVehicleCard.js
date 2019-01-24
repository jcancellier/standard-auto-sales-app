import React from 'react';
import { StyleSheet, LayoutAnimation, View } from 'react-native';
import { Card, Title, Caption, Button, Colors, Subheading, Paragraph, Text } from 'react-native-paper';
import NavigationService from '../../navigation/navigationService'
import { theme } from '../../global'


class ChooseVehicleCard extends React.Component {

  state = {
    expanded: false
  }

  _renderVehicleDetailsRow = (heading = '', detail = '', color) => {
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

  _renderVehicleDetails = () => {
    const { vehicle } = this.props;
    return (
      <React.Fragment>
        {this._renderVehicleDetailsRow(vehicle.year)}
        {this._renderVehicleDetailsRow('Odometer: ', `${vehicle.odo_reading} miles`)}
        {this._renderVehicleDetailsRow('VIN: ', `${vehicle.vin}`)}
        {this._renderVehicleDetailsRow('Received: ', `${vehicle.date_received}`)}
        {this._renderVehicleDetailsRow('Price: ', `$${vehicle.invoice_price}`, Colors.green700)}
        {this._renderVehicleDetailsRow('Test Drives: ', `${vehicle.testdrives.length}`)}
      </React.Fragment>
    );
  }

  render() {
    const { vehicle } = this.props;
    return (
      <Card
        style={styles.container}
        elevation={7}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          this.setState((prevState) => { return { expanded: !prevState.expanded } })
        }}
      >
        <Card.Cover source={{ uri: vehicle.maker.image }} />
        <Card.Content>
          <Title style={{ paddingTop: 5 }}>
            {`${vehicle.maker.make} ${vehicle.maker.model}`}
          </Title>
          {this.state.expanded && this._renderVehicleDetails()}
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button color={theme.colors.primary} mode='contained' style={{ margin: 5, marginTop: 0 }} onPress={() => alert('pressed')}>Select</Button>
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

export { ChooseVehicleCard };
