from setuptools import setup, find_packages
if __name__ == '__main__':
    setup(
        name='paperpulse_ai',
        version='0.1',
        packages=find_packages(where='src'),
        package_dir={'': 'src'},
        install_requires=[
            'numpy',
        ],
    )