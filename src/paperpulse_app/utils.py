import logging


def setup_logging(level=logging.INFO):
    """
    Configures logging for the application.
    """
    logging.basicConfig(level=level,
                        format="%(asctime)s [%(levelname)s] %(message)s",
                        datefmt="%Y-%m-%d %H:%M:%S")
    logging.info("Logging is configured.")


if __name__ == "__main__":
    setup_logging()
