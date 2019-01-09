import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { } from 'expo'
import { connect } from 'react-redux';
import { theme } from '../global';
import { Title, Headline, Caption, Text, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

class DashboardScreen extends React.Component {

  static navigationOptions = {
    title: 'Standard Auto Sales',
    headerStyle: { backgroundColor: theme.colors.background, borderBottomWidth: 0, zIndex: 0, elevation: 0 },
    headerTitleStyle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.medium,
      fontWeight: 'normal',
      fontSize: 14
    }
  }

  render() {
    const { user } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImageAndTextContainer}>
            <Image
              style={styles.headerImage}
              source={{ uri: user.image}}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitleText}>{`${user.first_name} ${user.last_name}`}</Text>
              <Caption style={{ paddingTop: 0, marginVertical: 0, lineHeight: 15 }}>{`Salesperson`}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Card style={{ width: 150, height: 150 }}>
              <Card.Content>

              </Card.Content>
            </Card>
            <View style={{padding: 10}}/>
            <Card style={{ width: 150, height: 150 }}>
              <Card.Content>

              </Card.Content>
            </Card>
          </View>
          <View style={{padding: 10}}/>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Card style={{ width: 150, height: 150 }}>
              <Card.Content>

              </Card.Content>
            </Card>
            <View style={{padding: 10}}/>
            <Card style={{ width: 150, height: 150 }}>
              <Card.Content>

              </Card.Content>
            </Card>
          </View>
        </View>
      </SafeAreaView>
    );
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
    borderRadius: 55/2,
    marginHorizontal: 20,

    overflow: 'hidden',
    alignSelf: 'center'
  },
  body: {
    flex: 8,
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.auth.salesperson
  }
}

export default connect(mapStateToProps)(DashboardScreen);