import { Component } from 'react';
import { FeedBackOptions } from './FeedbackOptions/FeedbackOptions.jsx';
import { Statistics } from './Statistics/Statistics.jsx';
import { Section } from './Section/Section.jsx';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, value) => acc + value, 0);
  };

  countPositiveFeedback = () => {
    return Math.round(this.state.good * 100) / this.countTotalFeedback();
  };

  render() {
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedback().toFixed(2);
    return (
      <>
        <Section title="Please leave feedback">
          <FeedBackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <p>There is no feedback</p>
          )}
        </Section>
      </>
    );
  }
}
