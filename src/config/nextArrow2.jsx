import React from 'react';

const NextArrow2 = ({ currentSlide, slideCount, ...props }) => {
  // Use currentSlide if needed
  // console.log(currentSlide);

  // Do not pass currentSlide to the button element
  const { currentSlide: _, ...rest } = props;
  return (
    <button {...rest}>
      {/* Custom arrow content, e.g., an icon */}
      Next
    </button>
  );
};

export default NextArrow2;
