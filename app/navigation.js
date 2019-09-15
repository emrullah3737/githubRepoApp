import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RepositoryScreen from './pages/Repository/Index';
import RepositoryDetailScreen from './pages/RepositoryDetail/Index';
import IssuesScreen from './pages/RepositoryDetail/Issues';
import PullRequestsDetailScreen from './pages/RepositoryDetail/PullRequests';

const RootStack = createStackNavigator(
  {
    Repository: RepositoryScreen,
    RepositoryDetail: RepositoryDetailScreen,
    Issues: IssuesScreen,
    PullRequests: PullRequestsDetailScreen,
  },
  {
    initialRouteName: 'Repository',
  },
);

export default createAppContainer(RootStack);
