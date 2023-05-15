const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

/*
The code snippet you provided is the implementation of the `reportWebVitals` function. This function is typically used in Create React App (CRA) projects to measure and report performance metrics of your application.
The `reportWebVitals` function takes an `onPerfEntry` callback function as a parameter. This callback function will be called with the performance metric entries to allow you to handle and report them as needed.
In the implementation, the function first checks if `onPerfEntry` is provided and is a function. If it is, it dynamically imports the `web-vitals` library using the `import()` function.
Once the `web-vitals` library is imported, it exposes several functions (`getCLS`, `getFID`, `getFCP`, `getLCP`, `getTTFB`) that correspond to different performance metrics like Cumulative Layout Shift (CLS), First Input Delay (FID), First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to First Byte (TTFB).
The `reportWebVitals` function then calls these `get` functions with the `onPerfEntry` callback, allowing you to handle and report each performance metric entry.
By default, the `reportWebVitals` function is included in Create React App projects to provide basic performance monitoring. You can customize this function to integrate with external analytics or monitoring services to track and analyze the performance of your application.
*/
