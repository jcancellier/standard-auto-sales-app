import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { theme } from '../global';
import * as Animatable from 'react-native-animatable';
import { Paragraph, Button, Caption, Text, Card, Colors, Subheading, Dialog, Portal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import navigationService from '../navigation/navigationService';

const { height, width } = Dimensions.get('window');

class DashboardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Standard Auto Sales',
      headerStyle: { backgroundColor: theme.colors.background, borderBottomWidth: 0, zIndex: 0, elevation: 0 },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontWeight: 'normal',
        fontSize: 14,
        paddingLeft: Platform.OS === 'ios' ? 16 : 0
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.state.params.showExitDialog()}>
            <Ionicons name="md-funnel" size={16} color={theme.colors.text} style={{ paddingLeft: 14 }} />
          </TouchableOpacity>
        );
      },
    }
  }

  state = {
    exitDialogVisible: false
  }

  _showExitDialog = () => this.setState({ exitDialogVisible: true });
  _hideExitDialog = () => this.setState({ exitDialogVisible: false });

  componentDidMount() {
    // TODO: remove. only for automated stack movement
    // navigationService.navigate('SalesStack');
    this.props.navigation.setParams({
      showExitDialog: this._showExitDialog
    })
  }

  render() {
    const { user, navigation, customers, vehicles, visits, sales } = this.props;
    return (

      <SafeAreaView style={styles.container}>
        <Animatable.View animation="fadeIn" style={styles.container}>

          <View style={styles.header}>
            <View style={styles.headerImageAndTextContainer}>
              <Image
                style={styles.headerImage}
                source={{ uri: user.image }}
              />
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitleText}>{`${user.first_name} ${user.last_name}`}</Text>
                <Caption style={{ paddingTop: 0, marginVertical: 0, lineHeight: 15 }}>{`Salesperson`}</Caption>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={{ flexDirection: 'row', flex: 1, maxHeight: width / 2 }}>
              <View style={{ padding: 10 }} />

              <Card style={styles.card} onPress={() => navigation.navigate('CustomersStack')}>
                <Card.Content style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Ionicons name="md-people" size={32} color={Colors.blue700} />
                  <View>
                    <Subheading>
                      Customers
                  </Subheading>
                    <Caption style={{ marginVertical: 0, paddingTop: 0, lineHeight: 15 }}>
                      {`${customers.length} customers`}
                    </Caption>
                  </View>
                </Card.Content>
              </Card>
              <View style={{ padding: 10 }} />
              <Card style={styles.card} onPress={() => navigation.navigate('SalesStack')} >
                <Card.Content style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Ionicons name="md-pricetags" size={32} color={Colors.green700} />
                  <View>
                    <Subheading>
                      Sales
                  </Subheading>
                    <Caption style={{ marginVertical: 0, paddingTop: 0, lineHeight: 15 }}>
                      {`${sales.length} bookings`}
                    </Caption>
                  </View>
                </Card.Content>
              </Card>
              <View style={{ padding: 10 }} />

            </View>
            <View style={{ flexDirection: 'row', maxHeight: width / 2, flex: 1 }}>
              <View style={{ padding: 10 }} />

              <Card style={styles.card} onPress={() => navigation.navigate('VehiclesStack')} >
                <Card.Content style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Ionicons name="md-car" size={32} color={Colors.red600} />
                  <View>
                    <Subheading style={{ marginVertical: 0 }}>
                      Vehicles
                  </Subheading>
                    <Caption style={{ marginVertical: 0, paddingTop: 0, lineHeight: 15 }}>
                      {`${vehicles.length} in stock`}
                    </Caption>
                  </View>
                </Card.Content>
              </Card>
              <View style={{ padding: 10 }} />
              <Card style={styles.card} onPress={() => navigation.navigate('VisitsStack')}>
                <Card.Content style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Ionicons name="md-calendar" size={32} color={Colors.orange700} />
                  <View>
                    <Subheading>
                      Visits
                  </Subheading>
                    <Caption style={{ marginVertical: 0, paddingTop: 0, lineHeight: 15 }}>
                      {`${visits.length} scheduled`}
                    </Caption>
                  </View>
                </Card.Content>
              </Card>
              <View style={{ padding: 10 }} />

            </View>
          </View>
          {this._renderExitDialog()}
        </Animatable.View>
      </SafeAreaView>
    );
  }

  _renderExitDialog = () => {
    return (
      <Portal>
        <Dialog
          visible={this.state.exitDialogVisible}
          onDismiss={this._hideExitDialog}
          dismissable={false}
          >
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you would like to logout?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideExitDialog}>Cancel</Button>
            <Button onPress={this._handleLogout}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  _handleLogout = () => {
    this.props.navigation.navigate('AuthStack')
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerImageAndTextContainer: {
    flexDirection: 'row',
  },
  headerTitleText: {
    fontSize: 24,
    fontFamily: theme.fonts.medium
  },
  headerSubText: {},
  headerTextContainer: {
    justifyContent: 'flex-start',
  },
  headerImage: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 20,

    overflow: 'hidden',
    alignSelf: 'center'
  },
  body: {
    flex: 8,
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    marginVertical: 10
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.auth.salesperson,
    customers: state.customers.customers,
    vehicles: state.vehicles.vehicles,
    visits: state.visits.visits,
    sales: state.sales.sales,

  }
}

export default connect(mapStateToProps)(DashboardScreen);