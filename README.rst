=====================================================
 jquery-grouped-fields Helper for selecting groups
=====================================================

Documentation
=============

jquery-grouped-fields helps you enforce certain rules on which checkboxes are allowed
to be selected together.

An example usage would be for a video tagging system. Lets say you have the
following groups of videos available.

Music Videos- Every Sperm is Sacred, Camelot Song, Brave Sir Robin
Medieval Videos- Camelot Song, Brave Sir Robin, Bridge of Death
Modern Videos- Dead Parrot, Ministry of Silly Walks

You'd like to force people to tag videos based on these groups. If someone selects
every sperm is sacred, you want to automatically select Camelot Song and Brave
Sir Robin. If they select Camelot Song, you don't want them to be able to select
Dead Parrot.

For full documenation, you can build the `sphinx`_ documentation yourself or
vist the `online jquery-grouped-fields documentation`_

.. _`sphinx`: http://sphinx.pocoo.org/
.. _`online jquery-grouped-fields documentation`: http://winhamwr.github.com/jquery-grouped-fields/