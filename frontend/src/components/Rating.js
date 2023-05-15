/*
The code you provided defines a functional component named `Rating`. This component is responsible for rendering a star rating based on the `rating` prop value and displaying the number of reviews (`numReviews` prop). Here's an explanation of how it works:
1. The component receives the `rating` and `numReviews` props.
2. Inside the component, it renders a `div` element with the class name "rating".
3. The component uses a series of `span` elements to display the star icons based on the `rating` value.
4. Each `span` element contains an `i` element with a class name determined by the rating value. It uses conditional expressions (`?:`) to set the appropriate class name based on specific rating thresholds.
5. The class names are from Font Awesome's icon classes. For example, if the `rating` is greater than or equal to 1, it sets the class name to `'fas fa-star'` to display a filled star icon. If the `rating` is greater than or equal to 0.5 but less than 1, it sets the class name to `'fas fa-star-half-alt'` to display a half-filled star icon. Otherwise, it sets the class name to `'far fa-star'` to display an empty star icon.
6. After rendering the star icons, it renders a `span` element to display the number of reviews (`numReviews` prop) next to the stars.
7. Finally, the `Rating` component is exported as the default export.
This component provides a visual representation of a rating using star icons and displays the number of reviews associated with the rating.
*/
function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? 'fas fa-star'
              : rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span> {numReviews} reviews</span>
    </div>
  );
}
export default Rating;
