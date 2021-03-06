import React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux-app/hooks';
import {
  SelectOnMaking,
  SelectonBeingSuggested,
  SelectkeepLorB,
  getOnMaking,
  getOnBeingSuggested,
  getLorBKeepLorB,
} from '../slices/lorbSlice/lorbSlice';
import { SelectUser, fetchUser } from '../slices/loginSlice/loginSlice';
import { TypographyAtoms } from '../components/atoms';
import {
  Container,
  makeStyles,
  Theme,
  Paper,
  createStyles,
  Button,
} from '@material-ui/core';
import Link from 'next/link';
import { ListMolecule } from '../components/molecules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: '10px 0 0 0',
    },
    box: {
      textAlign: 'center',
      padding: '0',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      margin: '10px 0 0 0',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '18px',
    },
  })
);

export const Home = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const onMaking = useAppSelector(SelectOnMaking);
  const onBeingSuggested = useAppSelector(SelectonBeingSuggested);
  const keepLorB = useAppSelector(SelectkeepLorB);
  const user = useAppSelector(SelectUser);

  const fetchData = async () => {
    await dispatch(fetchUser());
    await dispatch(getOnMaking());
    await dispatch(getOnBeingSuggested());
    await dispatch(getLorBKeepLorB());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user._id ? (
        <Container maxWidth="sm">
          <div>
            <div className={classes.list}>
              <Paper className={classes.paper}>
                {onMaking && onMaking && onMaking.count ? (
                  <Link href="/approvecreate" passHref>
                    <a>
                      <TypographyAtoms
                        variant="body1"
                        align="center"
                        className={classes.title}>
                        {`${onMaking?.count}?????????????????????????????????????????????`}
                      </TypographyAtoms>
                    </a>
                  </Link>
                ) : (
                  <TypographyAtoms
                    variant="body1"
                    align="center"
                    className={classes.title}>
                    {'??????????????????????????????'}
                  </TypographyAtoms>
                )}
              </Paper>
            </div>

            <div className={classes.list}>
              <Paper className={classes.paper}>
                {onBeingSuggested &&
                onBeingSuggested &&
                Boolean(onBeingSuggested.count) ? (
                  <Link href="/approvenegotiate" passHref>
                    <a>
                      <TypographyAtoms
                        variant="body1"
                        align="center"
                        className={classes.title}>
                        {`${onBeingSuggested?.count}?????????????????????????????????????????????`}
                      </TypographyAtoms>
                    </a>
                  </Link>
                ) : (
                  <TypographyAtoms
                    variant="body1"
                    align="center"
                    className={classes.title}>
                    {'??????????????????????????????'}
                  </TypographyAtoms>
                )}
              </Paper>
            </div>
          </div>

          {keepLorB && (
            <>
              <Paper className={classes.paper}>
                <ListMolecule
                  willShows={keepLorB?.LKeepOn}
                  text={`${keepLorB?.LCount}???????????????????????????`}
                  className={classes}
                  root={'lend'}
                />
              </Paper>

              <Paper className={classes.paper}>
                <ListMolecule
                  willShows={keepLorB?.BKeepOn}
                  text={`${keepLorB?.BCount}???????????????????????????`}
                  className={classes}
                  root={'borrow'}
                />
              </Paper>
            </>
          )}
        </Container>
      ) : (
        <TypographyAtoms variant="body1" align="center">
          ??????????????????????????????
        </TypographyAtoms>
      )}
    </>
  );
};

export default Home;
