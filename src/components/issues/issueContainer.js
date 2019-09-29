import React from "react";
import getIssues from "../../utils/getIssues";
import isEqual from "lodash/isEqual";
import Issue from "./Issue";
import Spinner from "../reusable/Spinner/spinner";

class IssueContainer extends React.Component {
  state = { issues: [], loading: false, error: "" };

  async componentDidMount() {
    this.setState(current => {
      return { ...current, loading: true };
    });
    this.fetchIssues();
  }
  async componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.setState(current => {
        return { ...current, loading: true };
      });
      this.fetchIssues();
    }
  }
  fetchIssues = async () => {
    try {
      let issues = await getIssues(this.props.project);
      this.setState(current => {
        return { ...current, loading: false, issues, error: "" };
      });
    } catch (error) {
      this.setState(current => {
        return {
          ...current,
          loading: false,
          error: "Not Supported Yet, Work in Progress See You soon 🙂"
        };
      });
    }
  };
  render() {
    const { error, loading, issues } = this.state;
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : error !== "" ? (
          error
        ) : issues.length === 0 ? (
          "No Good-First issues Found 😭"
        ) : (
          this.state.issues.map(issue => <Issue issue={issue} />)
        )}
      </div>
    );
  }
}

export default IssueContainer;
