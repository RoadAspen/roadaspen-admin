import React from 'react';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch, NavLink } from 'umi';
import { Badge } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import * as styles from './index.less'

const mapStateToProps = ({ tag }: ConnectState) => ({ tags: tag.tags });

type modelType = ReturnType<typeof mapStateToProps>;

interface Props extends modelType {
    dispatch: Dispatch
}
const TagContainer: React.FC<Props> = (props: Props) => {
    function removeTag(item: Props['tags'][0]) {
        if (item.del) {
            props.dispatch({
                type: 'tag/removeTag',
                payload: item
            })
        }
        if(item.path === "/system/user"){
            location.href = '/system/menu'
        }
    }
    return (
        <ul className={styles.tag_container}>
            {
                Object.values(props.tags).map(item => {
                    return (
                        <li className={styles.tag_item}>
                            <NavLink key={item.path} to={item.path} activeClassName={styles.active_link} className={item.del ? styles.close_icon : ''}>
                                <Badge size="default" color={'white'} className={styles.acitve_dot} />
                                {item.title}
                                {
                                    item.del ? <CloseOutlined className={styles.hover_close} onClick={() => removeTag(item)} /> : ''
                                }
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default connect(mapStateToProps)(TagContainer);