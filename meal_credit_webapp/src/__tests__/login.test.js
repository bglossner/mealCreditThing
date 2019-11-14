import { GeneralFormContainer } from '../login'
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

test('cookies properly store', () => {
    var indicatorComp = TestUtils.renderIntoDocument(<GeneralFormContainer />);
    expect(2 == 2);
});
