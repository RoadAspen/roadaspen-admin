import React from 'react';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch, NavLink } from 'umi';

const mapStateToProps = ({ tag }: ConnectState) => ({ tags: tag.tags });

type modelType = ReturnType<typeof mapStateToProps>;

interface Props extends modelType {
    dispatch:Dispatch
}
const TagContainer: React.FC<Props> = (props:Props) => {
    function removeTag(item: Props['tags'][0]) {
        if (item.del) {
            props.dispatch({
                type:'tag/removeTag',
                payload:item
            })
        }
    }
    return (
        <ul>
            {
                Object.values(props.tags).map((item, index) => {
                    return (
                        <li>
                            <NavLink key={item.path} to={item.path} onClick={() => removeTag(item)} >{item.title}</NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default connect(mapStateToProps)(TagContainer);