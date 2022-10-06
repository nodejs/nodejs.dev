import { useStaticQuery, graphql } from 'gatsby';

interface NvmData {
  nvm: {
    version: string;
  };
}

const useNvmVersion = () => {
  const { nvm }: NvmData = useStaticQuery(
    graphql`
      query NvmVersion {
        nvm {
          version
        }
      }
    `
  );

  return nvm.version;
};

export default useNvmVersion;
