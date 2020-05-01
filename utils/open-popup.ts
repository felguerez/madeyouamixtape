import queryString from "query-string";
let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const receiveMessage = (event: { data: string }, cb = (data: any) => {}) =>
  cb(queryString.parse(event.data));

export const openSignInWindow = (
  url: string,
  name: string,
  cb: (tokens: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  }) => void
) => {
  // remove any existing event listeners
  window.removeEventListener("message", receiveMessage);

  // window features
  const strWindowFeatures =
    "toolbar=no, menubar=no, width=600, height=900, top=0, left=100";

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
     or if such pointer exists but the window was closed */
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    /* if the resource to load is different,
     then we load it in the already opened secondary window and then
     we bring such window back on top/in front of its parent window. */
    windowObjectReference = window.open(url, name, strWindowFeatures);
    if (windowObjectReference) {
      windowObjectReference.focus();
    }
  } else {
    /* else the window reference must exist and the window
     is not closed; therefore, we can bring it back on top of any other
     window with the focus() method. There would be no need to re-create
     the window or to reload the referenced resource. */
    windowObjectReference.focus();
  }

  // add the listener for receiving a message from the popup
  window.addEventListener(
    "message",
    (event) => receiveMessage(event, cb),
    false
  );
  // assign the previous URL
  previousUrl = url;
};
