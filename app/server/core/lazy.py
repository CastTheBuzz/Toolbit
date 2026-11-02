"""Load heavy libraries on first use instead of at startup (faster app start)."""
import importlib


class Lazy:
    def __init__(self, name):
        self._name, self._mod = name, None

    def __getattr__(self, attr):
        if self._mod is None:
            self._mod = importlib.import_module(self._name)
        return getattr(self._mod, attr)


pd = Lazy("pandas")
np = Lazy("numpy")
