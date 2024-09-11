# Quick Tabletop

A Mock Virtual Tabletop.

You can open it on your browser at: [quik-tabletop](https://quick-tabletop.onrender.com) and play around with it

<img src="public/assets/default/screenshot.jpeg" alt="example" width="600" height="400" />

## Single Session - no persistency

This is a toy-model of the frontend, not an actual VTT.

You cannot have multiple players accessing and editing the same sessions, as there is currently no backend connected to it.

The token position and map selection are saved to localStorage to avoid losing them on refresh.

## Missing features

There are many features missing that would be required to make this usable in an actual game session (e.g. selection, distance measurements, different token size...)
This is just something I made for fun to play around with React. Actual development of a working VTT will continue in a different repo.
