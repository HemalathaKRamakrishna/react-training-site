import React from 'react';
// Step 8-3: import to bring in the function that will make the API request
import {fetchUserData} from "../mock-data";


// Step 8-2: Since we want to utilize state and use the life cycle methods for section 8, we'll convert this functional component into a class component
export class UserList extends React.Component {

  // Step 8-2: With this being a class now, remember to declare the constructor method with props being passed in
  constructor(props) {
    // Step 8-2: Always remember to declare the super passing in the props
    super(props);

    // Step 8-2: Setting up some states, "isListLoading" and "users".
    // "isListLoading" is to show some loading text while the API request is getting data. True by default
    // "users" is the property that will hold the data we get back from the response. null by default
    this.state = {
      isListLoading: true,
      users: null,
      // Step 9-6: Add an error state to hold any errors that may arise from the API request
      error: null
    }
  }

  // Step 8-4: utilize the "componentDidMount" life cycle method to grab the data immediately when this component is loaded
  componentDidMount() {
    this.loadUserData();
  }

  // Step 8-3: Create an "async" function to fetch the data and set it.
  async loadUserData() {
    // Step 9-6: To capture any error in an async/await pattern, we need to wrap the entire logic for a successful scenario in a try catch
    try {
      // Step 8-3: we use "await" here to wait for the "fetchUserData" to resolve and return the data, which will get stored in the "users" constant.
      const users = await fetchUserData();
      // Step 8-3: "setTimeout" being used here to mimic a slow API request
      setTimeout(() => {
        // Step 8-3: Once we get the data, update the state to store the user data and set "isListLoading" to be false.
        this.setState({
          isListLoading: false,
          users,
          error: null
        });
      }, 1500);
    } catch(e) {
      // Step 9-6: In this catch, whenever an error is triggered, we grab the Error object created and store it in state
      this.setState({
        error: e
      })
    }
  }


  // Step 8-2: Because we're converting to a class component, we need to Wrap existing code and logic inside of the "render" method.
  render() {

    // Step 9-6: Add logic check to see if any error has been set
    if (!!this.state.error) {
      throw this.state.error;
    }

    // Step 8-5: Check is the list is still loading. If so, render a loading message
    if (this.state.isListLoading) {
      return (
         <div>
           Loading...
         </div>
      );
    }

    // Step 8-5: Update the "list" const to make a copy from the "users" state rather than the "MOCK_USER_DATA" we had before.
    const list = this.state.users.slice();

    // Step 7-3: Taking the list of data, we will "map" each of the values in the list to be an HTML element, storing it in another variable, "userList"
    const userList = list.map((data) => {
      return (
        // Step 7-3: Whenever mapping a list, the "key" property will need to be added to help React identify this unique element.
        // By default, it will use the index, but if the data is ever sorted, then the index would no longer be accurate, so a unique id
        // is always best
        <div key={data.id} className="user">
          {/* Step 7-3: Display the information. Can do optional checks to confirm if the data exists or not and render the information accordingly */}
          <div>Name: {data.name}</div>
          <div>Email: {data.email}</div>
          <div>Phone: {data.phone}</div>
          <div>Website: {data.website}</div>
        </div>
      );
    });

    // Step 7-2: Return the HTML to be rendered
    return (
      <div className="user-list">
        {/* Step 7-3: Render the "userList" variable here */}
        {userList}
      </div>
    );
  }
}
