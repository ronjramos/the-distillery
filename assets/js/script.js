var body = document.getElementsByTagName("body")[0];

// You can choose whatever element is between the top and the bottom elements of your page
var main = document.getElementsByTagName("main")[0];
/* It's good to set minimum height because if your main
 * element is too small, it won't look good.
 *
 * However, keep in mind this value was set just for this
 * example, your minimum height can probably be something
 * like 50vh (50 percent of the viewport height). Just
 * play around with minimum height until you reach desired
 * result if you decide to implement this on your website
 * and you display dynamic content which can contain small
 * amount of content.
 */
main.style.minHeight = "900px";

// You can choose whatever element is on top of your page
initializeParallaxHeader(main, document.getElementsByTagName("header")[0]);

// You can choose whatever element is at the bottom of your page
initializeParallaxFooter(main, document.getElementsByTagName("footer")[0]);

function initializeParallaxHeader(mainElement, headerElement) {
  headerElement.style.left = "0";
  headerElement.style.right = "0";
  headerElement.style.zIndex = "-10";
  body.style.marginTop = headerElement.offsetHeight;
  updateParallaxHeader(mainElement, headerElement);
  window.addEventListener("resize", function() {
    updateParallaxHeader(mainElement, headerElement);
  });
  window.addEventListener("scroll", function() {
    updateParallaxHeader(mainElement, headerElement);
  });
}

function initializeParallaxFooter(mainElement, footerElement) {
  footerElement.style.left = "0";
  footerElement.style.right = "0";
  footerElement.style.zIndex = "-20";
  updateParallaxFooter(mainElement, footerElement);
  window.addEventListener("resize", function() {
    updateParallaxFooter(mainElement, footerElement);
  });
  window.addEventListener("scroll", function() {
    updateParallaxFooter(mainElement, footerElement);
  });
}

function updateParallaxHeader(mainElement, headerElement) {
  if (isViewportSmallerThan(headerElement)) {
    headerElement.style.top = "";
    headerElement.style.bottom = "0";
  } else {
    headerElement.style.bottom = "";
    headerElement.style.top = "0";
  }
  if (window.scrollY + window.innerHeight >= mainElement.offsetTop) {
    headerElement.style.marginTop = getNavbarHeight();
    headerElement.style.position = "fixed";
    body.style.marginTop = headerElement.offsetHeight + "px";
  } else {
    headerElement.style.marginTop = "0";
    headerElement.style.position = "static";
    body.style.marginTop = "0";
  }
  headerElement.style.zIndex =
    window.scrollY >= mainElement.offsetTop ? "-30" : "-10";

}

function updateParallaxFooter(mainElement, footerElement) {
  footerElement.style.marginTop = getNavbarHeight();
  if (isViewportSmallerThan(footerElement)) {
    footerElement.style.bottom = "";
    footerElement.style.top = "0";
  } else {
    footerElement.style.top = "";
    footerElement.style.bottom = "0";
  }
  if (window.scrollY > getBottomY(mainElement)) {
    footerElement.style.position = "static";
    body.style.marginBottom = "0";
  } else {
    body.style.marginBottom = footerElement.offsetHeight + "px";
    footerElement.style.position = "fixed";
  }
}

function isViewportSmallerThan(element) {
  return window.innerHeight < element.offsetHeight;
}

function getBottomY(element) {
  return element.offsetTop + element.offsetHeight;
}

function getNavbarHeight() {
  // Rremember to change the following line so it targets your navigation element
  return document.getElementsByTagName("nav")[0].offsetHeight;
}
