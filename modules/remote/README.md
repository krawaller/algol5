# The Remote module

This module defines the general shape of the remote API Chessicals expects. Other modules (like Firebase) can then implement that API. The main idea is to not tie the UI code to a specific implementation, instead the UI layer should use the types from this module.

Then the Next module, when instantiating the app, should pass in the actual implementation (like Firebase).

This module will also hold a dummy API implementation, to allow us to iterate on the UI more quickly.
